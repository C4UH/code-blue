export class Medication {
  name: string
  codes: string[]
  date: Date
}

export class Medications {
  medications: Medication[]
  error: string
}
