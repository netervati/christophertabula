from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

import os
from dotenv import dotenv_values

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

config = {
    **dotenv_values(".env"),
    **os.environ,
}

class Message(BaseModel):
    email: EmailStr
    body: str

app = FastAPI()
slack_token = config.get("SLACK_BOT_TOKEN")
client = WebClient(token=slack_token)

origins = [
    "https://christophertabula.com",
]

if config.get("FAST_API_ENVIRONMENT") == "development":
    origins.append("http://localhost:3000")
    origins.append("http://localhost:43000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.post('/send')
def send(message: Message):
    content = f"You got mail <@{config.get("SLACK_MEMBER_ID")}> :tada:"
    content += f"\n\nFrom: {message.email}"
    content += f"\n\n{message.body}"

    try:
        client.chat_postMessage(
            channel=config.get("SLACK_CHANNEL_ID"),
            text=content
        )
    except SlackApiError as e:
        raise HTTPException(
          status_code = 500,
          detail = "Failed to send message."
        )

    return

@app.get('/')
def health_check():
    return "ok"
