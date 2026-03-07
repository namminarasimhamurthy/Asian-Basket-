import { useEffect, useState } from "react";
import { getAddresses, addAddress, deleteAddress } from "@/lib/addressApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AddressManager({ onSelect }: any) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});

  const token = localStorage.getItem("access_token") || "";

  const load = async () => {
    const res = await getAddresses(token);
    setAddresses(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    await addAddress(token, form);
    setForm({});
    load();
  };

  const remove = async (id: number) => {
    await deleteAddress(token, id);
    load();
  };

  return (
    <div className="space-y-4 mb-6">
      <h3 className="font-bold text-lg">Saved Addresses</h3>

      {addresses.map((a) => (
        <Card key={a.id} className="p-3 flex justify-between items-center">
          <div>
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm">{a.street}, {a.city}</p>
          </div>
          <div className="space-x-2">
            <Button size="sm" onClick={() => onSelect(a)}>Use</Button>
            <Button size="sm" variant="destructive" onClick={() => remove(a.id)}>Delete</Button>
          </div>
        </Card>
      ))}

      {addresses.length < 3 && (
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
          <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})}/>
          <input placeholder="Street" onChange={e => setForm({...form, street: e.target.value})}/>
          <input placeholder="City" onChange={e => setForm({...form, city: e.target.value})}/>
          <input placeholder="State" onChange={e => setForm({...form, state: e.target.value})}/>
          <input placeholder="Zip" onChange={e => setForm({...form, zip_code: e.target.value})}/>
          <Button onClick={save}>Add Address</Button>
        </div>
      )}
    </div>
  );
}
