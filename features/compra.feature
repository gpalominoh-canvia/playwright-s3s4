# language: es
@ejercicio4
Característica: Compra de punta a punta
  Como comprador
  Quiero pagar lo que tengo en el carrito
  Para recibir mis productos

  Antecedentes:
    Dado que inicié sesión como "standard_user"

  @smoke
  Escenario: Comprar dos productos
    Dado que agregué al carrito "Sauce Labs Backpack" y "Sauce Labs Bike Light"
    Cuando completo la compra con los datos:
      | nombre       | Ana    |
      | apellido     | Torres |
      | codigoPostal | 15001  |
    Entonces el resumen muestra subtotal, impuesto y total correctos
    Y veo la confirmación "Thank you for your order!"