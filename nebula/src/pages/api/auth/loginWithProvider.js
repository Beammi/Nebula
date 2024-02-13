import db from "../../../lib/db";
import { supabase } from "../../../lib/supabaseClient"

async function providerLoginHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { provider, email } = req.body; // Token provided by Supabase after provider login
  // const { data: { user } ,error} = await supabase.auth.getUser()
  // const userPayload = await supabase(token);
  // if (!userPayload) {
  //   return res.status(401).json({ message: 'Invalid session token.' });
  // }

  // const { user } = userPayload;
  // let user = (await db.query('SELECT * FROM users WHERE user = $1', [user])).rows[0];
  // console.log("Supabase: "+JSON.stringify(userPayload))
  let display_name = email.split("@")[0];
  display_name += provider

  const { rows } = await db.query(
    'SELECT * FROM users WHERE display_name = $1',
    [display_name]
  );

  if (rows.length > 0) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }else{

    await db.query(
      'INSERT INTO users (provider,email,display_name) VALUES ($1, $2, $3)',
      [provider, email, display_name]
    );
    
  }
  
  
  // Implement session creation or token generation logic here
  // ...

  res.status(200).json({ message: 'Logged in successfully with provider.' });
}

export default providerLoginHandler;
