[![Scam Grabber - PoC](https://github.com/ilogus/scam-grabber/blob/08dd68f0547fe8d276a195bef17c2ab0cc97ab50/img/banner.jpg?raw=true)](https://github.com/ilogus/scam-grabber/)

# Scam Grabber - PoC

## Introduction

Scam Grabber is a unique solution designed to enhance security and protect individuals and organizations from potential scammers, especially in online platforms for renting accommodations and various exchanges. It addresses the issue of scammers requesting sensitive documents by disguising itself as a stylish file download service.

The concept behind Scam Grabber is to send a link to the scammer, seemingly containing the requested documents. When the scammer clicks the link, the service retrieves valuable information such as their geolocation, browser details, and more. This data allows for further investigation to determine if the person is genuinely trustworthy or a potential scammer. For instance, if someone claims to be selling an apartment in Montpellier but their geolocation indicates a known scammer-prone country, it raises red flags.

## Features

- Seamless Geolocation Verification: Obtain the geolocation data of the person clicking the link to confirm their authenticity.
- Browser Details: Access information about the user's browser, aiding in identifying suspicious activities.
- Node.js and Express: Developed using Node.js and Express for a robust and efficient backend.
- Docker Support: Containerized for easy deployment, available on Docker Hub for quick setup.
- Docker Compose: Simplify infrastructure management with the provided `docker-compose-example.yml` (rename to `docker-compose.yml`) for rapid project deployment.

## Usage

To run Scam Grabber, follow these steps:

1. Exemple without docker compose

```bash
docker run -d \
-e CLOUDFLARE=<true|false> \
-e DISCORD_WEBHOOK=<your_discord_webhook_url> \
-p 8080:3000 \
ilogus/scam-grabber:latest
```

2. Exemple with docker compose

```bash
cp docker-compose-example.yml docker-compose.yml
docker compose run -d
```

## Disclaimer

**Disclaimer:** Scam Grabber is intended for educational and security purposes only. It should be treated as a Proof of Concept (PoC) and not as a production-ready solution. Use it responsibly and ensure compliance with all applicable laws and regulations. The author of this project cannot be held responsible for any errors, misuse, or unintended consequences that may arise from its usage.

## License

**License:** This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.