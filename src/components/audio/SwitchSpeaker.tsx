import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function SwitchSpeaker() {
  const [enabled, setEnabled] = useState(false)

  // Enabled Agente - Disabled Cliente

  const handleChange = () => {
    
  }

  return (
    <div className="">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-sky-600' : 'bg-sky-500'}
          selection:bg-transparent relative inline-flex h-[30px] w-[65px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Speaker Switch</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
