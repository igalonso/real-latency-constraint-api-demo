
var response = context.getVariable("tokenresponse.content");
response = JSON.parse(response);
context.setVariable('access_token',response.access_token);
var current_value = context.getVariable("request.queryparam.current");
print("Current value= "+current_value);
context.setVariable('current_value',current_value);
print(context.getVariable('access_token'));