# signin

route => `POST` | `/api/signin`
payload =>

```json
{
  "email": "",
  "password": ""
}
```

# get user details

route => `GET` | `/api/users/:email`
payload =>

```json
{
  "email": ""
}
```

# update user details

route => `/api/users/:email`

Below are the different stages that you can update

## `tenant` stage

payload =>

```json
{
  "stageId": "tenant",
  "data": {
    "tenantName": "Shubham Industries"
  }
}
```

## 'products' stage
