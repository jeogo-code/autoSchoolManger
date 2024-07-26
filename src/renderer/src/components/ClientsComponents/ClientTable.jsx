import TableHeader from './TableHeader';
import ClientRow from './ClientRow';

const ClientTable = ({ clients }) => (
  <div className="overflow-x-auto px-6">
    <table className="w-full table-auto border-collapse">
      <TableHeader />
      <tbody className="bg-white">
        {clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  </div>
);

export default ClientTable;
