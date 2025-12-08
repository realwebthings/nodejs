# Cloud SQL Proxy Setup for Cross-Project Access

## 1. Grant IAM Permissions

In the **database project** (`productiontothesquare-be`):
```bash
gcloud projects add-iam-policy-binding productiontothesquare-be \
  --member="serviceAccount:CLOUD_RUN_SERVICE_ACCOUNT@thesquare-be.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

## 2. Update Cloud Run Service

Add Cloud SQL connection in your Cloud Run deployment:

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
    run.googleapis.com/cloudsql-instances: productiontothesquare-be:REGION:INSTANCE_NAME
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/cloudsql-instances: productiontothesquare-be:REGION:INSTANCE_NAME
    spec:
      containers:
      - image: gcr.io/thesquare-be/your-app
        env:
        - name: DB_HOST
          value: "/cloudsql/productiontothesquare-be:REGION:INSTANCE_NAME"
        - name: DB_USER
          value: "postgres"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-password
              key: password
```

## 3. Application Code

```javascript
import { Client } from 'pg';

const client = new Client({
  host: '/cloudsql/productiontothesquare-be:REGION:INSTANCE_NAME',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

await client.connect();
```

## 4. Deploy Command

```bash
gcloud run deploy your-service \
  --image gcr.io/thesquare-be/your-app \
  --add-cloudsql-instances productiontothesquare-be:REGION:INSTANCE_NAME \
  --project thesquare-be
```

Replace `REGION` and `INSTANCE_NAME` with your actual PostgreSQL instance details.