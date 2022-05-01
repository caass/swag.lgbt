import { Device } from "@twilio/voice-sdk";

type TwilioCredentials = {
  TWILIO_ACCOUNT_ID: string;
  TWILIO_AUTH_TOKEN: string;
};

export const onPost: PagesFunction<TwilioCredentials> = async ({
  request,
  env,
}) => {
  return new Response(env.TWILIO_ACCOUNT_ID);
};
