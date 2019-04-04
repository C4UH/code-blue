export class Medication {
  name: string
  codes: string[]
  date: string
}

export class Medications {
  medications: Medication[]
  error: string
}
