import React from 'react'
import { Wrapper } from './wrapper'
import Toggle from './toggle'
import Navigation from './navigation'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}

export default Sidebar