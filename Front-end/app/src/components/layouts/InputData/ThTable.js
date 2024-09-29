
function ThTable({scope, title, className}) {
  return (
    <th scope={scope} className={className}>
       {title}
    </th>
  );
}   

export default ThTable;