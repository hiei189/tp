ErrorMessages = ({errorBackendMessages}) => {
  return (
    <ul>
      {typeof errorBackendMessages === 'string'?
        <li>
          {errorBackendMessages}
        </li>
        :
        utils.mapObject(errorBackendMessages,(error,errorMessage)=>{
        return <Lierror key={error} error = {errorMessage} />
      })}
    </ul>
  )
}

const Lierror = ({error}) => {
  return (
    <li>
      {error}
    </li>
  )
}
