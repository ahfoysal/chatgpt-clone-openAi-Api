"use client";
import Layout from "@/components/Layout";
import Content from "@/components/chat/Content";
import Footer from "@/components/chat/Footer";
import ChatTextarea from "@/components/chat/ChatTextarea";
import Back from "@/components/Back";

export default function ChatPage() {
  return (
    <Layout title="Chat">
      <Back />
      <Content />
      <Footer>
        <ChatTextarea />
      </Footer>
    </Layout>
  );
}
