import { Card, CardBody } from "@heroui/card";

export function WhySection() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 flex align-center justify-center gap-4">
        Why DropCore?
      </h2>
      <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
        Everything you need to securely store and access your files from
        anywhere.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">
              🔐 Simple & Secure Login
            </h3>
            <p className="text-gray-600 text-sm">
              Your data is protected. Login to access your private storage space
              anytime, anywhere.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">
              💾 Free Storage Space
            </h3>
            <p className="text-gray-600 text-sm">
              Every user gets a generous storage limit to safely store
              documents, images, and more.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">
              📂 Drag & Drop Uploads
            </h3>
            <p className="text-gray-600 text-sm">
              Upload files quickly and easily—just drag and drop or use our
              upload interface.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">
              🖼️ Instant File Previews
            </h3>
            <p className="text-gray-600 text-sm">
              View your text files in a built-in editor, or preview images with
              our fast image viewer.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">
              🌐 Accessible From Any Device
            </h3>
            <p className="text-gray-600 text-sm">
              No installs, no hassle. Just log in and manage your files from
              your browser.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
