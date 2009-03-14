puts "Copying files..."

dest_file = File.join(RAILS_ROOT, "public",   "javascripts", "jquery.yaripe.js")
src_file = File.join(File.dirname(__FILE__) , "javascripts", "jquery.yaripe.js")

FileUtils.cp_r(src_file, dest_file)

puts "Files copied - Installation complete!"
