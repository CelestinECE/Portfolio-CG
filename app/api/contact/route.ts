import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      )
    }

    // TODO : intégrer Resend quand la clé API sera configurée
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'portfolio@votredomaine.com',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Nouveau message de ${name}`,
    //   text: `De: ${name} (${email})\n\n${message}`,
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    )
  }
}
