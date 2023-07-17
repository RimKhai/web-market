import React from 'react'

interface UIBlockProps {
    styles?: string,
    children?: React.ReactNode
}

const UIBlock: React.FunctionComponent<UIBlockProps> = ({styles, children}) => {
  return (
    <div className={styles + ' flex flex-col p-16 space-y-3 rounded-[30px] bg-white shadow-[0_7px_4px_1px_rgba(0,0,0,0.1),inset_0_0_4px_1px_rgba(0,0,0,0.03)]'}>
      {children}
    </div>
  )
}

export default UIBlock
