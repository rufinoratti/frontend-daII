import { CheckCircle } from '@phosphor-icons/react'

export function Toast({ message }: { message: string }) {
  return <div className="toast" role="status"><CheckCircle size={20} weight="fill" />{message}</div>
}
