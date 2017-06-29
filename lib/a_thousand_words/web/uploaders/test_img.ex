defmodule AThousandWords.TestImg do
  @moduledoc """
  these functions return representations of images, usually in binary or other similar formats.
  """

  @doc """
  Returns a string-keyed map of image parameters, mocking the input
  you might receive from an image uploaded to a web form.

  Is actually the Binary for a 1x1px black dot.
  """
  def base64_img_params() do
    %{"filename" => "testimg.png", 
      "binary" => "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="}
  end
end