import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
export default class Security {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) { // La request tiene todo lo que se envia desde el POSTMAN
    let theRequest = request.toJSON() //Convertir la carta, para extraer detalles
    console.log(theRequest);
    if (theRequest.headers.authorization) { //Miro la autorizacion de la carta 
      let token = theRequest.headers.authorization.replace("Bearer ", "") //Obtengo el token del usuario
      let thePermission: object = { //
        url: theRequest.url, //A lo que quieren acceder.
        method: theRequest.method //Lo que hago es obtener el metodo.
      }
      try {
        const result = await axios.post(`${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`, thePermission,
          {
            headers: {
              Authorization: `Bearer ${token}` //Usuario que accede más veces al endPoint de películas.
            }
          }
        )
        console.log("La respuesta de ms-security >" + result.data + "<")
        if (result.data == true) { 
          console.log(result.data)
          await next()
        } else {
          console.log("no puede ingresar")
          return response.status(401)
        }
      } catch (error) {
        console.error(error)
        return response.status(401)
      }
    }else{
      return response.status(401) 
    }

  }
}
