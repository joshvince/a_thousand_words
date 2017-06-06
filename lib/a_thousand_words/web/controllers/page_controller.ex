defmodule AThousandWords.Web.PageController do
  use AThousandWords.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
