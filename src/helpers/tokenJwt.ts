const jwt = require('jsonwebtoken');

class TokenJwt {
  public generarJWT(id: any, usuario: string) {
    return new Promise((resolve, reject) => {
      const payload = {
        id,
        usuario,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: '8h',
        },
        (err: string, token: string) => {
          if (err) {
            console.log(err);
            reject('No se pudo generar el JWT');
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export const tokenJwt = new TokenJwt();
