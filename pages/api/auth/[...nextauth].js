import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
    //Ativar JWT
    session: {
        jwt: true,
    },
    pages:{
        signIn: 'login'
    },
    //Provider
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                //Connect to DB
                const client = await MongoClient.connect(
                    process.env.MONGO_CONNECTION,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                );
                // Procurar user com email indicado
                const result = await client.db().collection('utilizadores').findOne({
                    email: credentials.email,
                });

                //Not found - send error res
                if (!result) {
                    client.close();
                   return null;
                }
                //Check hased password with DB password
                const checkPassword = await compare(credentials.password, result.password);

                // Password incorreta
                if (!checkPassword) {
                    client.close();
                    return null;
                    //throw new Error('Credenciais inválidas');
                }
                //Em caso de sucesso
                client.close();

                return { id: result._id.toString(), name: result.name, email: result.email };
            },
        }),
    ],
});