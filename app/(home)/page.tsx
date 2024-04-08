import Link from "next/link"

export default async function IndexPage() {

  return (
    <div className="mt-[10rem]">
      <div className="md:flex rounded-xl md:p-0">
        <img className="md:h-auto md:rounded-none rounded-full mx-auto sm:mx-0"
            src="/images/avatars/ant.png"
            alt=""
            width="200" height="268"/>
        <div className="md:pl-14 md:pt-6">
          <span className="font-medium text-xl hidden sm:flex sm:text-left">Hi, I'm Pacos</span>
        </div>
      </div>
      <div className="pt-12">
        <div className="animate-delay-600 flex justify-center sm:justify-start">
          <div className="flex space-x-8">
            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href="mailto:huakucha95@163.com"
            >
              <span className="i-radix-icons-envelope-closed w-8 h-8"/>
            </a>
            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href="https://github.com/MagicalZhu"
            >
              <span className="i-carbon-logo-github w-8 h-8"/>
            </a>
            <a className="cursor-pointer hover:opacity-30"
              target="_blank"
              href="https://m.cmx.im/@athu"
            >
              <span className="i-carbon-logo-mastodon w-8 h-8"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
