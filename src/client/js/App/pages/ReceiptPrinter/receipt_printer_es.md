**ReceiptPrinter** es una app de iOS para imprimir tickets en las impresoras de
la marca EPSON a partir de ficheros JSON. Si eres un desarrollador y tu cliente
tiene la necesidad de imprimir tickets de venta, no pierdas el tiempo tratando
de entender el API de EPSON, simplemente instálale esta app y genérale
directamente los tickets que necesita en un tiempo record. Continua leyendo para
ver lo sencillo que es generar tickets e imprimirlos usando **ReceiptPrinter**.

## Formato del fichero

Lo primero que necesitas saber es cómo estructurar el fichero que se envía a
**ReceiptPrinter**. Esta aplicación funciona con ficheros _.jrec_. Se trata de
una extensión personalizada que la aplicación registra en el dispositivo del
usuario una vez esta es instalada. En realidad, no es más que un fichero plano
con texto en formato JSON. De esta manera, se consigue que cuando el dispositivo
se encuentre con un fichero de este tipo, le proponga al usuario abrirlo usando
**ReceiptPrinter** y esta que se encargará de leerlo y comenzará con el proceso
de impresión

A continuación se muestra un ejemplo real de ticket:

```json
{
  "defaultAlign": "left",
  "defaultTextSize": 1,
  "defaultCharactersPerLine": 42,
  "sections": [
    {
      "type": "image",
      "url": "http://anadedal.iaguilarmartin.com/images/anaDedal_logo.png",
      "align": "center"
    },
    {
      "type": "divider",
      "lines": 1
    },
    {
      "type": "text",
      "text": "13/12/16\nIvan Aguilar Martin\n"
    },
    {
      "type": "divider",
      "lines": 2
    },
    {
      "type": "items",
      "items": [
        {
          "name": "3.5 x tela morena",
          "value": 17.5
        },
        {
          "name": "Costuraterapia - Bono 4",
          "value": 80
        },
        {
          "name": "Patronaje y diseño Semanal",
          "value": 80
        },
        {
          "name": "Nuevo articulo",
          "value": 12
        }
      ]
    },
    {
      "type": "divider",
      "lines": 2
    },
    {
      "type": "items",
      "textSize": 2,
      "items": [
        {
          "name": "TOTAL",
          "value": 198.5
        }
      ]
    },
    {
      "type": "divider",
      "lines": 1
    },
    {
      "type": "cut"
    }
  ]
}
```

Como se puede ver, el fichero contiene un objeto JSON con cuatro atributos:

- **defaultAlign**: Permite definir la alineación por defecto del ticket. Si no
  se ha definido ningún valor de alineación en las distintas secciones del
  ticket entonces se utiliza el valor indicado en este atributo. Posibles
  valores: “left”, “right” o “center”.
- **defaultTextSize**: Permite definir el tamaño de fuente por defecto del
  ticket. Si no se ha definido ningún valor de tamaño de texto en las distintas
  secciones del ticket entonces se utiliza el valor indicado en este atributo.
- **defaultCharactersPerLine**: Máximo número de caracteres de ancho que tendrá
  en ticket.
- **sections**: Se trata de un array que contendrá un objeto JSON por cada
  sección que se quiere añadir en el ticket.

### Secciones disponibles

Cada objeto de sección deberá tener un atributo cuyo nombre es “type” con el que
indicar el tipo de sección a incluir. Hay seis tipos de secciones disponibles y
puedes ser combinadas indistintamente dentro del ticket. A continuación se
incluye una descripción de cada uno de los tipos:

1. **image**: Incluye una imagen en el ticket. Esta imagen debe estar almacenada
   en un servidor y ser accesible a través de internet. Por medio del atributo
   “url” se indicará la dirección donde descargar la imagen. La alineación de la
   imagen se puede definir usando el atributo “align”.
2. **divider**: Sección que incluye un espacio en blanco. El tamaño de dicha
   separación estará determinado por el valor especificado en el atributo
   “lines”.
3. **text**: Sección de tipo texto. Se puede usar para incluir los datos del
   comprador, la tienda, un pie de página etc. El aspecto que tendrá el texto
   puede ser alterando usando los atributos “align” y “textSize”.
4. **barcode**: Para añadir al ticket un código de barras simplemente añade una
   sección de este tipo rellenando el atributo “code” con el valor numérico del
   código de barras en formato CODE39.
5. **items**: Esta sección se usa para imprimir los elementos comprados ya que
   coloca a la izquierda el nombre del producto y a la derecha su precio,
   dejando entre medias el numero de espacios necesarios hasta alcanzar el
   tamaño especificado en el atributo del ticket “defaultCharactersPerLine”
   visto anteriormente. El aspecto de los elementos puede ser personalizado
   usando “align” y “textSize. El atributo “items” contendrá un objeto por cada
   producto y estará formado por los atributos “name” y “value”.
6. **cut**: De esta forma se como se indica el final del ticket. Hace que sea
   mucho más fácil realizar el corte del mismo. El aspecto que tendrá el ticket
   una vez impreso usando **ReceiptPrinter** será el siguiente:

![Ticket de ejemplo](https://res.cloudinary.com/dr4a6933v/image/upload/v1648593813/iaguilarmartin.com/ticket.png)

## Enviando el ticket a la aplicación

Ahora que ya está familiarizado con la estructura del fichero vamos a ver como
enviar esos tickets a **ReceiptPrinter**. Hay tres formas distintas de
conseguirlo:

### 1. Abriendo un fichero

El primer método es el más sencillo. Si está trabajando en una página web desde
tu iPhone o iPad simplemente genera el fichero .jrec con la estructura adecuada
y haga que el explorador lo descargue. Como se ha comentado anteriormente, el
dispositivo reconocerá que es un fichero propietario de la app
**ReceiptPrinter** e incluirá un botón para su apertura. Una vez abierto la app
continuará con el proceso de impresión de manera automatizada.

### 2. Descargando el fichero desde una URL

Si el encargado de generar el fichero es su propio backend, simplemente invoque
a **ReceiptPrinter** usando su esquema de URL personalizado llamado
**IAMPrintReceipt** e indicando en el parámetro “ticketURL” la dirección al
end-point de su servidor. **ReceiptPrinter** una vez más hará el trabajo sucio
realizando la llamda y continuando con la impresión.

### 3. Enviando el contenido del fichero directamente a la app

Probablemente la mejor forma de haver llegar un ticket a la app
**ReceiptPrinter** es usando su esquema de URL personalizado como antes pero
indicando directamente el contenido del ticket dentro del parámetro “ticketJSON”
de la siguiente manera:

```text
IAMPrintReceipt://?ticketJSON=%7B%22defaultAlign%22%3A%22left%22%2C%22defaultTextSize%22%3A1%2C%22defaultCharactersPerLine%22%3A42%2C%22sections%22.....
```

Si tras leer este tutorial sigue teniendo dudas acerca de como usar esta app.
por favor, no dude en ponerse en contacto conmigo.
