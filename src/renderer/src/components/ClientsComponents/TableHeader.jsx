const TableHeader = () => (
  <thead className="bg-cyan-600 text-white">
    <tr>
      {[
        'الصورة',
        'اللــــقب',
        'الإســـم',
        'تــاريخ التسجيل',
        'رقم الهاتف',
        'المجموعة',
        'المعرف',
        'عمليات'
      ].map((header, index) => (
        <th key={index} className="px-4 py-3 text-right text-base font-medium">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
