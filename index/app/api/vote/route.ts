import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignorar en Server Components
            }
          },
        },
      }
    )

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado. Debes iniciar sesión para votar.' },
        { status: 401 }
      )
    }

    // Obtener datos del body
    const body = await request.json()
    const { siteId, voteType } = body

    if (!siteId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del sitio.' },
        { status: 400 }
      )
    }

    // Verificar que el sitio existe
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id')
      .eq('id', siteId)
      .single()

    if (siteError || !site) {
      return NextResponse.json(
        { error: 'El sitio no existe.' },
        { status: 404 }
      )
    }

    // Si voteType es null, eliminar el voto existente
    if (voteType === null) {
      const { error: deleteError } = await supabase
        .from('votes')
        .delete()
        .eq('user_id', user.id)
        .eq('site_id', siteId)

      if (deleteError) {
        console.error('Error al eliminar voto:', deleteError)
        return NextResponse.json(
          { error: 'Error al eliminar el voto.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, action: 'deleted' })
    }

    // Validar tipo de voto
    if (voteType !== 'up' && voteType !== 'down') {
      return NextResponse.json(
        { error: 'Tipo de voto inválido. Debe ser "up" o "down".' },
        { status: 400 }
      )
    }

    // Verificar si ya existe un voto
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id, vote_type')
      .eq('user_id', user.id)
      .eq('site_id', siteId)
      .single()

    if (existingVote) {
      // Actualizar voto existente
      const { error: updateError } = await supabase
        .from('votes')
        .update({ vote_type: voteType })
        .eq('id', existingVote.id)

      if (updateError) {
        console.error('Error al actualizar voto:', updateError)
        return NextResponse.json(
          { error: 'Error al actualizar el voto.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, action: 'updated' })
    }

    // Crear nuevo voto
    const { error: insertError } = await supabase
      .from('votes')
      .insert({
        user_id: user.id,
        site_id: siteId,
        vote_type: voteType,
      })

    if (insertError) {
      console.error('Error al crear voto:', insertError)
      return NextResponse.json(
        { error: 'Error al crear el voto.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, action: 'created' })

  } catch (error) {
    console.error('Error en API de votos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
