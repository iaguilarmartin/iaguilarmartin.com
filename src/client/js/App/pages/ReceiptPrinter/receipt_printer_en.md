**ReceiptPrinter** is an iOS app that prints receipts on EPSON POS printers from
a JSON file. If you are a developer and your client needs to print receipts over
one of those printers, don’t waste your time trying to learn how to use EPSON’s
API, just invoke this app from your web page or iOS app and problem solved!.
Continue reading to see how easy is to generate your own receipts and sending
them to **ReceiptPrinter**.

## File format

First thing you need to know is how to structure the files you will send to
**ReceiptPrinter**. This app works with _.jrec_ files. It is a custom file
extension that the app registers into user’s device once it is installed. The
truth is that this file extension encapsulates a simple file with text in JSON
format. Doing so, we achieve that every time your device comes up with a _.jrec_
file it will suggest opening it with **ReceiptPrinter** that automatically
starts printing process.

Here you have a sample of a real receipt file content:

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

As you can see it contains an object with four attributes:

- **defaultAlign**: Used to define receipt default alignment. If align attribute
  is not defined inside receipt sections then receipt would be generated using
  align value specified here. Possible values are: “left”, “right” or “center”.
- **defaultTextSize**: It is used to define receipt default text size. If
  textSize attribute is not defined inside receipt sections then, receipt would
  be generated using size value specified here.
- **defaultCharactersPerLine**: Maximum number of characters that would be
  printed into each line of the receipt.
- **sections**: It is an array and contains an object for each section we want
  to include into the receipt.

### Sections available

Every section object has an attribute witch name is “type” to determine the
nature of that section. There are six different types of sections and you can
combine as much as you want into your receipt. Let’s explain them:

1. **image**: Include an image into the receipt. Image must be stored on a
   server and be accesible from the internet. Use “url” attribute to indicate
   image address. Image alignment also can be defined using “align” attribute.
2. **divider**: It adds to the receipt a blank space between two sections. The
   size of this space would be determined by “lines” integer attribute value.
3. **text**: A simple text section to include a description or shop information
   inside your receipts. Text can be customized using “align” and “textSize”
   attributes.
4. **barcode**: If you have the need of adding a barcode to the receipt, just
   include one section of this type and specify into “code” attribute the value
   to be transformed into a barcode in CODE39 format.
5. **items**: This section is used to print purchased items into your receipt
   because it writes the name of the product at the left side of the receipt and
   its price at the right side, leaving between them the number of spaces
   available and determinated by receipt “defaultCharactersPerLine” attribute
   seen before. The appearance of the items can be customized using “align” and
   “textSize” attributes. “items” attribute will contain an array of products
   formed by a “name” and a “value” attribute.
6. **cut**: This is how we indicate the end of the receipt. It helps the user to
   cut the receipt easier.

Here you have an image of the previous receipt printed using **ReceiptPrinter**.

![Receipt example](https://res.cloudinary.com/dr4a6933v/image/upload/v1648593813/iaguilarmartin.com/ticket.png)

## Sending receipt to the app

Now that you are familiarized with the structure of the receipt lets see how to
send it to **ReceiptPrinter**. The fact is that you can do that in three
different ways:

### 1. Opening the file

The first is the simplest method too. If you are working on a web page from your
iPad or iPhone just generate a .jrec file and tell your browser to download it.
As I mentioned before, your device will provide to you a button to open it using
**ReceiptPrinter**. After that, the app will continue printing the receipt.

### 2. Downloading the receipt from a URL

If your back-end is in charge of generating the receipt, no problem, just invoke
**ReceiptPrinter** using its custom URL scheme named **IAMPrintReceipt** and
indicate into “ticketURL” parameter the address to the middle-point of your
server. **ReceiptPrinter** once again would do the hard job performing the
request and continuing with printing process.

### 3. Sending receipt content to the app

Probably the best option of sending the receipt to **ReceiptPrinter** is
building a custom URL scheme as before but providing directly the content of the
receipt in JSON format using _“ticketJSON”_ parameter like that:

```text
IAMPrintReceipt://?ticketJSON=%7B%22defaultAlign%22%3A%22left%22%2C%22defaultTextSize%22%3A1%2C%22defaultCharactersPerLine%22%3A42%2C%22sections%22.....
```

If after reading that tutorial you still have any doubt about how to use this
app, please, do not hesitate to contact me.
