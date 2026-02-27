import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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
              // Ignorar
            }
          },
        },
      }
    )

    // Obtener parámetros de query
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Construir query
    let query = supabase
      .from('sites')
      .select('*', { count: 'exact' })
      .order('score', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filtrar por categoría si se especifica
    if (category && ['onlyfans', 'porno', 'webcams'].includes(category)) {
      query = query.eq('category', category)
    }

    const { data: sites, error, count } = await query

    if (error) {
      console.error('Error al obtener sitios:', error)
      return NextResponse.json(
        { error: 'Error al obtener los sitios.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      sites,
      total: count,
      limit,
      offset,
    })

  } catch (error) {
    console.error('Error en API de sitios:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}

// Endpoint para agregar un nuevo sitio (requiere autenticación)
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
              // Ignorar
            }
          },
        },
      }
    )

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado.' },
        { status: 401 }
      )
    }

    // Obtener datos del body
    const body = await request.json()
    const { name, url, category, description, thumbnail_url, preview_url } = body

    // Validaciones
    if (!name || !url || !category) {
      return NextResponse.json(
        { error: 'Se requieren nombre, URL y categoría.' },
        { status: 400 }
      )
    }

    if (!['onlyfans', 'porno', 'webcams'].includes(category)) {
      return NextResponse.json(
        { error: 'Categoría inválida.' },
        { status: 400 }
      )
    }

    // Verificar si la URL ya existe
    const { data: existing } = await supabase
      .from('sites')
      .select('id')
      .eq('url', url)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Esta URL ya está registrada.' },
        { status: 409 }
      )
    }

    // Insertar nuevo sitio
    const { data: newSite, error: insertError } = await supabase
      .from('sites')
      .insert({
        name,
        url,
        category,
        description: description || null,
        thumbnail_url: thumbnail_url || null,
        preview_url: preview_url || null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error al crear sitio:', insertError)
      return NextResponse.json(
        { error: 'Error al crear el sitio.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, site: newSite }, { status: 201 })

  } catch (error) {
    console.error('Error en API de sitios:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
