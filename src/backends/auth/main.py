import os
from flask import Flask
app = Flask(__name__)


@app.route("/v1/oauth/accesstoken")
def auth():
    name = os.environ.get("NAME", "World")
    return  {
  "issued_at" : "1416157639014",
  "application_name" : "e49ef95f-6d32-4062-ac9a-3beea62ca922",
  "scope" : "",
  "status" : "approved",
  "api_product_list" : "[Test App product]",
  "expires_in" : "3599",
  "developer.email" : "testdev@example.com",
  "organization_id" : "0",
  "token_type" : "BearerToken",
  "client_id" : "kWocGgKENrdWRT0jq4l0F0ACnPAQsD3",
  "access_token" : "WNSnwquKualbgnGeAK0EXGqzO3A",
  "organization_name" : "example",
  "refresh_token_expires_in" : "0",
  "refresh_count" : "0"
}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))