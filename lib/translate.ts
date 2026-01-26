
export type TranslatorConfig = {
  endpoint?: string; // e.g., https://api.cognitive.microsofttranslator.com
  key: string;
  region?: string; // e.g., westeurope
};

const DEFAULT_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';

function getConfig(): TranslatorConfig {
  const key = process.env.AZURE_TRANSLATOR_KEY;
  const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT || DEFAULT_ENDPOINT;
  const region = process.env.AZURE_TRANSLATOR_REGION;

  if (!key) {
    throw new Error('AZURE_TRANSLATOR_KEY missing in environment');
  }
  return { key, endpoint, region };
}

export async function translateTexts(
  texts: string[],
  to: string,
  from: string = 'en'
): Promise<string[]> {
  if (!texts.length) return [];
  const cfg = getConfig();

  const url = new URL('/translate', cfg.endpoint);
  url.searchParams.set('api-version', '3.0');
  url.searchParams.set('to', to);
  if (from) url.searchParams.set('from', from);

  const body = texts.map((t) => ({ text: t }));

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cfg.key,
      ...(cfg.region ? { 'Ocp-Apim-Subscription-Region': cfg.region } : {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Translator API error ${res.status}: ${errText}`);
  }

  const json = (await res.json()) as Array<{
    translations: Array<{ text: string; to: string }>;
  }>;

  return json.map((item) => item.translations[0]?.text ?? '');
}
