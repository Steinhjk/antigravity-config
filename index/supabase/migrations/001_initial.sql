-- =============================================
-- Migración Inicial: Índice de Contenido Adulto
-- =============================================

-- Tabla de sitios
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('onlyfans', 'porno', 'webcams')),
  description TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  score INTEGER GENERATED ALWAYS AS (upvotes - downvotes) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX idx_sites_category ON sites(category);
CREATE INDEX idx_sites_score ON sites(score DESC);
CREATE INDEX idx_sites_category_score ON sites(category, score DESC);

-- Tabla de votos
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, site_id)
);

-- Índices para votos
CREATE INDEX idx_votes_user ON votes(user_id);
CREATE INDEX idx_votes_site ON votes(site_id);

-- Tabla de metadata de usuarios
CREATE TABLE user_metadata (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address TEXT,
  age_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Sites: lectura pública
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sites are viewable by everyone"
  ON sites FOR SELECT
  USING (true);

CREATE POLICY "Sites are insertable by authenticated users"
  ON sites FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Votes: usuarios solo pueden ver/modificar sus propios votos
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own votes"
  ON votes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own votes"
  ON votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
  ON votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON votes FOR DELETE
  USING (auth.uid() = user_id);

-- User metadata: usuarios solo pueden ver/modificar su propia metadata
ALTER TABLE user_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own metadata"
  ON user_metadata FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metadata"
  ON user_metadata FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metadata"
  ON user_metadata FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- Funciones y Triggers
-- =============================================

-- Función para actualizar contadores de votos
CREATE OR REPLACE FUNCTION update_site_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE sites SET upvotes = upvotes + 1 WHERE id = NEW.site_id;
    ELSE
      UPDATE sites SET downvotes = downvotes + 1 WHERE id = NEW.site_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Si cambia el tipo de voto
    IF OLD.vote_type != NEW.vote_type THEN
      IF NEW.vote_type = 'up' THEN
        UPDATE sites SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = NEW.site_id;
      ELSE
        UPDATE sites SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.site_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE sites SET upvotes = upvotes - 1 WHERE id = OLD.site_id;
    ELSE
      UPDATE sites SET downvotes = downvotes - 1 WHERE id = OLD.site_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para votos
CREATE TRIGGER on_vote_change
  AFTER INSERT OR UPDATE OR DELETE ON votes
  FOR EACH ROW
  EXECUTE FUNCTION update_site_votes();

-- =============================================
-- Datos Iniciales (Seed)
-- =============================================

-- Categoría: OnlyFans / Creadoras
INSERT INTO sites (name, url, category, description, thumbnail_url, upvotes, downvotes) VALUES
('OnlyFans', 'https://onlyfans.com', 'onlyfans', 'La plataforma líder de contenido de suscripción para creadores', '/previews/onlyfans.jpg', 1500, 50),
('Fansly', 'https://fansly.com', 'onlyfans', 'Alternativa popular a OnlyFans con más flexibilidad', '/previews/fansly.jpg', 800, 30),
('Fanvue', 'https://fanvue.com', 'onlyfans', 'Plataforma emergente con buenas comisiones para creadores', '/previews/fanvue.jpg', 400, 20),
('LoyalFans', 'https://loyalfans.com', 'onlyfans', 'Plataforma con enfoque en comunidad y lealtad', '/previews/loyalfans.jpg', 350, 25),
('Unfiltrd', 'https://unfiltrd.com', 'onlyfans', 'Sin censura, contenido sin filtros', '/previews/unfiltrd.jpg', 300, 15),
('FanCentro', 'https://fancentro.com', 'onlyfans', 'Conecta fans con creadores de contenido adulto', '/previews/fancentro.jpg', 280, 20),
('AdmireMe', 'https://admireme.vip', 'onlyfans', 'Plataforma premium para creadores', '/previews/admireme.jpg', 250, 18),
('BentBox', 'https://bentbox.co', 'onlyfans', 'Vende sets de fotos y videos directamente', '/previews/bentbox.jpg', 220, 15),
('ManyVids', 'https://manyvids.com', 'onlyfans', 'Clips, shows en vivo y contenido personalizado', '/previews/manyvids.jpg', 600, 40),
('IsMyGirl', 'https://ismygirl.com', 'onlyfans', 'Plataforma de suscripción para modelos', '/previews/ismygirl.jpg', 180, 12);

-- Categoría: Porno (estilo Pornhub)
INSERT INTO sites (name, url, category, description, thumbnail_url, upvotes, downvotes) VALUES
('Pornhub', 'https://pornhub.com', 'porno', 'El sitio de videos para adultos más grande del mundo', '/previews/pornhub.jpg', 2500, 100),
('XVideos', 'https://xvideos.com', 'porno', 'Enorme biblioteca de videos gratuitos', '/previews/xvideos.jpg', 2200, 90),
('XNXX', 'https://xnxx.com', 'porno', 'Miles de videos porno gratis', '/previews/xnxx.jpg', 1800, 80),
('RedTube', 'https://redtube.com', 'porno', 'Videos HD gratuitos y premium', '/previews/redtube.jpg', 1200, 60),
('YouPorn', 'https://youporn.com', 'porno', 'Comunidad de videos amateur y profesional', '/previews/youporn.jpg', 1100, 55),
('Tube8', 'https://tube8.com', 'porno', 'Videos en alta calidad de múltiples categorías', '/previews/tube8.jpg', 900, 45),
('SpankBang', 'https://spankbang.com', 'porno', 'Videos HD con buena organización', '/previews/spankbang.jpg', 850, 35),
('XHamster', 'https://xhamster.com', 'porno', 'Gran variedad de contenido amateur', '/previews/xhamster.jpg', 1400, 70),
('Eporner', 'https://eporner.com', 'porno', 'Videos 4K y HD gratuitos', '/previews/eporner.jpg', 700, 30),
('PornTrex', 'https://porntrex.com', 'porno', 'Agregador de videos de calidad', '/previews/porntrex.jpg', 500, 25),
('HQPorner', 'https://hqporner.com', 'porno', 'Solo contenido en alta calidad', '/previews/hqporner.jpg', 650, 28),
('Beeg', 'https://beeg.com', 'porno', 'Interfaz minimalista y elegante', '/previews/beeg.jpg', 550, 22),
('PornOne', 'https://pornone.com', 'porno', 'Videos gratuitos con buena selección', '/previews/pornone.jpg', 400, 20),
('PornPics', 'https://pornpics.com', 'porno', 'Galerías de fotos en alta resolución', '/previews/pornpics.jpg', 380, 18),
('Brazzers', 'https://brazzers.com', 'porno', 'Estudio premium con producciones de alta calidad', '/previews/brazzers.jpg', 1600, 200);

-- Categoría: Webcams
INSERT INTO sites (name, url, category, description, thumbnail_url, upvotes, downvotes) VALUES
('Chaturbate', 'https://chaturbate.com', 'webcams', 'La plataforma de cams más popular del mundo', '/previews/chaturbate.jpg', 2000, 80),
('Stripchat', 'https://stripchat.com', 'webcams', 'Shows en vivo con VR disponible', '/previews/stripchat.jpg', 1500, 60),
('BongaCams', 'https://bongacams.com', 'webcams', 'Modelos internacionales en vivo', '/previews/bongacams.jpg', 1200, 55),
('LiveJasmin', 'https://livejasmin.com', 'webcams', 'Cams premium con modelos profesionales', '/previews/livejasmin.jpg', 1400, 70),
('CamSoda', 'https://camsoda.com', 'webcams', 'Shows interactivos y únicos', '/previews/camsoda.jpg', 900, 40),
('MyFreeCams', 'https://myfreecams.com', 'webcams', 'Comunidad activa con sistema de tokens', '/previews/myfreecams.jpg', 1100, 50),
('Cam4', 'https://cam4.com', 'webcams', 'Cams amateur de todo el mundo', '/previews/cam4.jpg', 700, 35),
('Flirt4Free', 'https://flirt4free.com', 'webcams', 'Shows de alta calidad y chat privado', '/previews/flirt4free.jpg', 600, 30),
('ImLive', 'https://imlive.com', 'webcams', 'Veterano en la industria de cams', '/previews/imlive.jpg', 550, 28),
('Streamate', 'https://streamate.com', 'webcams', 'Modelos verificadas y shows privados', '/previews/streamate.jpg', 650, 32),
('Cams.com', 'https://cams.com', 'webcams', 'Variedad de categorías y modelos', '/previews/cams.jpg', 500, 25),
('xLoveCam', 'https://xlovecam.com', 'webcams', 'Modelos europeas en vivo', '/previews/xlovecam.jpg', 400, 20),
('CamContacts', 'https://camcontacts.com', 'webcams', 'Conexiones más personales con modelos', '/previews/camcontacts.jpg', 350, 18),
('Cherry.tv', 'https://cherry.tv', 'webcams', 'Nueva plataforma con interfaz moderna', '/previews/cherry.jpg', 300, 15),
('SakuraLive', 'https://sakuralive.com', 'webcams', 'Modelos asiáticas en vivo', '/previews/sakuralive.jpg', 450, 22);
