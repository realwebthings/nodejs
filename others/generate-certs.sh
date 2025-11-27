#!/bin/bash

# Generate private key
openssl genrsa -out localhost-privkey.pem 2048

# Generate certificate
openssl req -new -x509 -key localhost-privkey.pem -out localhost-cert.pem -days 365 -subj "/CN=localhost"

echo "✅ SSL certificates generated:"
echo "- localhost-privkey.pem (private key)"
echo "- localhost-cert.pem (certificate)"