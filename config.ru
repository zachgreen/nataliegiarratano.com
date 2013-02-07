use Rack::Static, 
  :urls => ["/content/images", "/scripts", "/content/css"],
  :root => "public"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/default.html', File::RDONLY)
  ]
}