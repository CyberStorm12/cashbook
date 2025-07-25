export default function handler(req, res) {
  // Example static data; replace with real data source as needed
  const data = {
    books: [],
    transactions: [],
    loanBooks: [],
    loanTransactions: [],
  };

  // Helper: JS object to XML string
  function jsObjectToXml(obj) {
    function toXml(v, name) {
      if (Array.isArray(v)) {
        return v.map((item) => toXml(item, name)).join("");
      } else if (typeof v === "object" && v !== null) {
        let inner = Object.entries(v)
          .map(([k, val]) => toXml(val, k))
          .join("");
        return `<${name}>${inner}</${name}>`;
      } else {
        return `<${name}>${String(v)}</${name}>`;
      }
    }
    return (
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<cashbook>' +
      Object.entries(obj)
        .map(([k, v]) => toXml(v, k))
        .join("") +
      '</cashbook>'
    );
  }

  const xml = jsObjectToXml(data);
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Disposition', 'attachment; filename="cashbook_data.xml"');
  res.status(200).send(xml);
}