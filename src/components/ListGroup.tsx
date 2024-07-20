import { useState } from "react";
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

//import { MouseEvent } from "react";
function ListGroup({ items, heading, onSelectItem }: Props) {
  //let items = [1, 2, 3, 4, 5];
  //let selectedIndex = 0;
  const [selectedIndex, setSelectedIndex] = useState(-1); //State Hook

  //arr[0]; //variable selectedIndex
  //arr[1]; //updater function
  //const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>There are no items in the list</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            //onClick={handleClick}
            //onClick={() => console.log(item, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
