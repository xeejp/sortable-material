defmodule YourApplication do
  use Xee.ThemeScript

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => %{
     }}}
  end

  def join(data, id) do
    {:ok, %{"data" => data}}
  end

    def handle_received(data, _action) do
      {:ok, %{"data" => data}}
  end

  def handle_received(data, _action, _id) do
    {:ok, %{"data" => data}}
  end
end
