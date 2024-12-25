export default function LocationsSection() {
  return (
    <section className="pt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Locations</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="font-semibold mb-2">Sydney</h3>
          <p className="text-gray-600">123 Business Street</p>
          <p className="text-gray-600">Sydney, NSW 2000</p>
          <p className="text-gray-600">Australia</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">New York</h3>
          <p className="text-gray-600">456 Tech Avenue</p>
          <p className="text-gray-600">New York, NY 10001</p>
          <p className="text-gray-600">United States</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">London</h3>
          <p className="text-gray-600">789 Innovation Road</p>
          <p className="text-gray-600">London, EC1A 1BB</p>
          <p className="text-gray-600">United Kingdom</p>
        </div>
      </div>
      <div className="mt-6 aspect-video w-full bg-gray-100 rounded-lg">
        {/* Add your map component here */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Map placeholder
        </div>
      </div>
    </section>
  );
}
