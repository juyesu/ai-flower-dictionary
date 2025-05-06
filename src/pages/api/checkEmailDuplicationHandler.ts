import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

const checkEmailDuplicationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { email } = req.query

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: '잘못된 매개 변수입니다.' })
  }

  try {
    const { data: userList, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    const isDuplicate = userList.users.some((user) => user.email === email)

    if (isDuplicate) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' })
    }

    return res.status(200).json({ message: '이메일을 사용할 수 있습니다.' })
  } catch (err) {
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' })
  }
}

export default checkEmailDuplicationHandler
