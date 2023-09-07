import { RadioGroup } from '@headlessui/react';
import React, { useEffect, useState } from 'react';



export default function RadioButton({ handleChange, conversationId }: any) {

  const plans = [
    {
      name: 'Agente',
      id: 1,
    },
    {
      name: 'Cliente',
      id: 2,
    },
  ];

  useEffect(() => {
    // When the component mounts or when the form is submitted, reset the selected state to the first plan
    setSelected(plans[0]);
  }, [conversationId]); 

  const [selected, setSelected] = useState<any>(plans[0]);
  
  const handleRadioButton = (data:any) => {
    // setSelected(data);
    const speakerLabel = data.id;
    handleChange({ conversationId, speakerLabel });
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} by="id" onChange={(e)=>{
          setSelected(e)
          handleRadioButton(e)
        }}>
          <RadioGroup.Label className="sr-only"></RadioGroup.Label>
          <div className="space-x-6 flex justify-center">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer transition-all rounded-lg px-5 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-light-white' : 'text-dark-primary'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
