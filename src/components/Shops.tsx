import { shopsApi } from "services/shopsApi";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Shop } from "services/types";

type ShopWithPosition = Shop & { position: [number, number]}

const hasPosition = (shop: Shop): shop is ShopWithPosition => shop.position !== undefined

function ChangeView({ center, zoom }: { center: [number, number], zoom: number}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export const Shops = () => {
  const { data } = shopsApi.useGetShopsQuery();
  const [create] = shopsApi.useCreateShopMutation();
  const [remove] = shopsApi.useRemoveShopMutation();

  const [selectedShop, setSelectedShop] = useState<null | Shop>(null);
  return (
    <div>
      <h1>Shops</h1>
      <ShopForm addNewItem={(data) => create({ name: data.item })} />
      <ul>
        {data?.map((shop) => {
          return (
            <li key={shop.id}>
              {shop.name}
              <button onClick={() => remove(shop.id)}>Remove</button>
              <button onClick={() => setSelectedShop(shop)}>Select</button>
            </li>
          );
        })}
      </ul>

      <MapContainer
        center={[51, 0]}
        
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 300 }}
      >
        <ChangeView center={selectedShop?.position ?? [51, 0]} zoom={13} /> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data
          ?.filter(hasPosition)
          .map((shop) => {
            return (
              <Marker position={shop.position}>
                <Popup>
                  {shop.name}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

interface Props {
  addNewItem: (data: { item: string }) => void;
}

export const ShopForm = ({ addNewItem }: Props) => {
  const [item, setItem] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    setItem("");

    addNewItem({ item });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={item}
        placeholder="Enter the shop"
        required
        onChange={handleChange}
      />

      <button type="submit">Add Item</button>
    </form>
  );
};
