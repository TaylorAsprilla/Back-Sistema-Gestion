const jwt = require('jsonwebtoken');

class TokenJwt {
  public generarJWT(id: number, usuario: string) {
    return new Promise((resolve, reject) => {
      const payload = {
        id,
        usuario,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        },
        (err: string, token: string) => {
          if (err) {
            console.log(err);
            reject('No se pudo genere el JWT');
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export const tokenJwt = new TokenJwt();
