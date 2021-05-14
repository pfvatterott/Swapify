import React from "react";


export const ItemsList=(props)=> {
  return (
      <div>
        props.items.map(item, i) => {
            return 
                <div className="col-xs-3" >
                    <Item
                        key={i}
                        image={item.itemURL }
                        name={item.itemName}
                        description={item.Description}
                        />
                </div>
        })
        )
      </div> 
  );
}
export default ItemsList;