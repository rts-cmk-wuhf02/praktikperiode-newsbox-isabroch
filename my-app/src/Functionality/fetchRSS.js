function xmlstringToXmldom(xmlString) {
  /* Parse string of XML to DOM */
  const parser = new DOMParser();
  const xmlDom = parser.parseFromString(xmlString, "application/xml");
  return xmlDom;
}

function xmldomToJson(xml) {
  let children = [...xml.children];

  /* Stop recursion when there are no children */
  if (children.length === 0) {
    return xml.innerHTML;
  }

  /* Initializing empty object to store JSON in */
  let jsonResult = {};

  /* Create property in jsonResult for each unique node name in xml */
  for (const child of children) {
    /* Check if there are multiple elements with same name */
    let childIsArray =
      children.filter(filterChild => filterChild.nodeName === child.nodeName)
        .length > 1;

    /* If multiple of same nodename, store value in array, else store value */
    if (childIsArray) {
      /* If first element, initializes the array, else pushes to array */
      if (jsonResult[child.nodeName] === undefined) {
        jsonResult[child.nodeName] = [xmldomToJson(child)];
      } else {
        jsonResult[child.nodeName].push(xmldomToJson(child));
      }
    } else {
      jsonResult[child.nodeName] = xmldomToJson(child);
    }
  }

  return jsonResult;
}

export async function getRssFeed(link) {
  const response = await fetch(link);
  const xmlString = await response.text();
  const xmlDom = xmlstringToXmldom(xmlString);
  const json = xmldomToJson(xmlDom);
  return json;
}