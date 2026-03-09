import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk"

const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY!
const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION!

export async function speechToText(): Promise<string> {
  return new Promise((resolve, reject) => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      speechKey,
      speechRegion
    )

    speechConfig.speechRecognitionLanguage = "en-US"

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()

    const recognizer = new SpeechSDK.SpeechRecognizer(
      speechConfig,
      audioConfig
    )

    recognizer.recognizeOnceAsync(result => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        resolve(result.text)
      } else {
        reject("Speech not recognized")
      }

      recognizer.close()
    })
  })
}

export function speakText(text: string) {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    speechKey,
    speechRegion
  )

  speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural"

  const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig)

  synthesizer.speakTextAsync(
    text,
    () => synthesizer.close(),
    () => synthesizer.close()
  )
}