export default async function request(
    url,
    method = "GET",
    body = null,
    headers = {}
  ) {

    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
  
    }
   
    const response = await fetch(`https://admin.armapps.am${url}`, {
      method,
      body,
      headers,
      // credentials: "include",
    });
  
  
    const data = await response.json();
  
    return data;
  }
  