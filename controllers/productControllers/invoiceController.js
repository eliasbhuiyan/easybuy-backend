const invoiceSchema = require("../../modal/invoiceSchema");

const createInvoice = async (req, res) => {
    const invoiceData = req.body
    const data = invoiceData.invoiceData
    try {
        if (!data) {
            return res.status(400).send({ error: "What the hell!" });
        }
        if (!data.customer.invoiceId) {
            return res.status(400).send({ error: "Invoice Id is required!" });
        }
        if (!data.customer.name) {
            return res.status(400).send({ error: "Customer name is required!" });
        }
        if (!data.customer.address) {
            return res.status(400).send({ error: "Customer address is required!" });
        }
        if (!data.customer.phone) {
            return res.status(400).send({ error: "Customer Phone is required!" });
        }
        if (data.items.length === 0) {
            return res.status(400).send({ error: "Please Add Item" });
        }
        if (!data.totals) {
            return res.status(400).send({ error: "What the hell!" });
        }
        if (!data.totals.paid) {
            return res.status(400).send({ error: "Pay bill first!" });
        }
        if (data.totals.paid < 0) {
            return res.status(400).send({ error: "Pay bill first!" }); z
        }
        const existingInvoice = await invoiceSchema.findOne({
            "customer.invoiceId": data.customer.invoiceId
        })

        if (existingInvoice) {
            return res.status(400).send({ error: "Invoice Id already exist" });
        }
        const invoice = new invoiceSchema({
            customer: data.customer,
            items: data.items,
            totals: data.totals,
        })
        invoice.save()
        console.log(invoice);
        return res.status(200).send({ message: "Invoice Created Successfully" });
    } catch (error) {
        return res.status(400).send({ error: "Something is wrond! Try again" });
    }
}

const invoiceList = async (req, res) => {
    try {
        const invoice = await invoiceSchema.find()
        return res.status(200).send({ invoice })
    } catch (error) {
        return res.status(400).send({ error: "Something is wrond! Try again" });
    }
}

module.exports = { createInvoice, invoiceList }