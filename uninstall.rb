# Uninstall hook code here
puts "Deleting files..."

dest_file = File.join(RAILS_ROOT, "public", "javascripts", "jquery.yaripe.js")

FileUtils.rm(dest_file)

puts "Files deleted - Uninstallation complete!"
