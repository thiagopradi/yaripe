module Yaripe
  include ActionView::Helpers::DateHelper

  def edit_in_place(resource, field, options={})
    record = resource.is_a?(Array) ? resource.last : resource

    options[:tag] ||= :span
    options[:url] ||= url_for(resource)

    options[:attribute] = field

    options[:object] = record.class.to_s.downcase

    options[:rel] ||= options.delete(:url)

    if  options[:select_options] && !options[:select_options].empty?
      options[:select_options] = options[:select_options].join(",")
    end

    if options[:field_type] == "date"
      if record.send(field).nil?
        options[:date_helper] = date_select(record, field, { }, {:id => "inplace_input"})
      else
        options[:date_helper] = date_select(record, field, {:default => {:day => record.send(field).day, :month => record.send(field).month, :year => record.send(field).year}}, {:id => "inplace_input"})
      end
    end

    options.delete(:url)

    classes = options[:class].split(' ') rescue []
    classes << 'yaripe'
    options[:class] = classes.uniq.join(' ')

    record.send(field).to_s.empty? ? value = "Click to edit..." : value = record.send(field)

    content_tag(options.delete(:tag), value, options)
  end
end
