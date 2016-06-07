function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

ErrorMessages = ({errorBackendMessages}) => {
  return (
    <ul>
      {typeof errorBackendMessages === 'string'?
        <li>
          {errorBackendMessages}
        </li>
        :
        mapObject(errorBackendMessages,(error,errorMessage)=>{
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
